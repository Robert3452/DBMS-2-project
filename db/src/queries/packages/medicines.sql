create or replace package medicines
is
  procedure get_autocomplete(
    p_query varchar2,
    p_result out sys_refcursor);
  procedure get_medicines(
    p_query varchar2,
    p_result out sys_refcursor,
    p_offset integer,
    p_count out integer);
  procedure get_medicine(
    p_id integer,
    p_result out sys_refcursor);
  procedure get_analogs(
    p_id integer,
    p_result out sys_refcursor);
end;

create or replace package body medicines
is
  procedure get_autocomplete(
    p_query varchar2,
    p_result out sys_refcursor) is
  begin
    open p_result for
    select id, title, similarity(title, p_query) as score from drugs
    where similarity(title, p_query) > 80
    order by score desc
    FETCH NEXT 5 ROWS ONLY;
  end;
  procedure get_medicines(
    p_query varchar2,
    p_result out sys_refcursor,
    p_offset integer,
    p_count out integer) is
  declare
    type r_drugs is record (
      title varchar2(1000)
    );

    v_count number := 0;
  begin
    open p_result for
    select id, title, status, similarity(title, p_query) as score, 
      get_medicine_min_price(id) as price,
      get_medicine_available(id) as available
    from drugs
    where similarity(title, p_query) > 80
    order by score desc
    OFFSET p_offset ROWS
    FETCH NEXT 5 ROWS ONLY;

    for d in (select title from drugs) loop
      if (similarity(d, p_query) > 80) then
        v_count := v_count + 1;
      end if;
    end loop;

    p_count := v_count;
  end;
  procedure get_medicine(
    p_id integer,
    p_result out sys_refcursor) is
  begin
    open p_result for
    select id, title, status, get_medicine_available(id) as available from drugs
    where id = p_id;
  end;
  procedure get_analogs(
    p_id integer,
    p_result out sys_refcursor) is
  begin
    open p_result for
    select d.id, d.title, d.status, a.analog_id 
    from drugs d join drugs_analogs a on (d.id = a.analog_id)
    where a.drug_id = p_id;
  end;
end;







