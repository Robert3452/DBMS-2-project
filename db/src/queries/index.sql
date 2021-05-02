-- Tables begin
create table pharmacies (
  id integer primary key,
  title varchar2(200) not null,
  phones varchar(200) not null,
  address varchar2(200) not null,
  latitude number,
  longitude number
);

create table drugs (
  id integer primary key,
  title varchar2(1000) not null,
  status varchar2(20) not null
);

create table drugs_to_ph (
  id integer primary key,
  ph_id integer not null,
  drug_id integer not null,
  price number,
  foreign key(ph_id) references pharmacies(id),
  foreign key(drug_id) references drugs(id)
);

create table drugs_analogs (
  id integer primary key,
  drug_id integer not null,
  analog_id integer not null,
  foreign key(drug_id) references drugs(id),
  foreign key(analog_id) references drugs(id)
);

create table users (
  id integer GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key,
  phone varchar2(20) unique not null,
  fullname varchar2(100) not null,
  password varchar2(200) not null
);

create table users_log (
  id integer GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key,
  user_id integer not null,
  datetime date not null
);

create table posts (
  id integer GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key,
  user_id integer not null,
  title varchar2(200) not null,
  status varchar2(20) not null,
  amount varchar2(200) not null,
  storage varchar2(200) not null,
  expires date not null,
  contacts varchar2(100) not null,
  post_status varchar2(20) not null,
  foreign key(user_id) references users(id)
);


create table posts_log (
  id integer GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key,
  post_id integer not null,
  datetime date not null,
  action varchar2(100) not null
);
-- Tables end

-- Triggers begin
create trigger users_add_trigger
  after insert on users
  referencing new as new
  for each row
begin
  insert into users_log(user_id, datetime) values(:new.id, sysdate);
end;

create trigger posts_add_trigger
  after insert on posts
  referencing new as new
  for each row
begin
  insert into posts_log(post_id, datetime, action) values(:new.id, sysdate, 'insert');
end;

create trigger posts_update_trigger
  after update on posts
  referencing new as new
  for each row
begin
  insert into posts_log(post_id, datetime, action) values(:new.id, sysdate, 'update');
end;
-- Triggers end

-- Functions begin
create or replace function similarity_ph(string varchar2, substring varchar2)
return number is
begin
 return (length(lower(string)) - UTL_MATCH.EDIT_DISTANCE(lower(substring), lower(string))) / length(lower(substring));
  -- return UTL_MATCH.JARO_WINKLER_SIMILARITY(string, substring);
end;

create or replace function similarity(string varchar2, substring varchar2)
return number is
begin
--  return (length(string) - UTL_MATCH.EDIT_DISTANCE(substring, string)) / length(substring);
  return UTL_MATCH.JARO_WINKLER_SIMILARITY(lower(string), lower(substring));
end;

create or replace function get_medicine_min_price(p_id integer) 
return integer is
  v_result integer := null;
begin
  select min(price) into v_result from drugs_to_ph
  where drug_id = p_id
  group by drug_id;

  return v_result;
exception
  when NO_DATA_FOUND then
    return null;
end;

create or replace function get_medicine_available(p_id integer) 
return integer is
  v_result integer := 0;
begin
  select count(*) into v_result from drugs_to_ph
  where drug_id = p_id
  group by drug_id;
  
  if v_result != 0 then
    return 1;
  end if;
  return 0;
exception
  when NO_DATA_FOUND then
    return null;
end;
-- Functions end