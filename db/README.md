# Инструкция по установке проекта

Предварительно:

1. Иметь установленную БД oracle-xe 18c версии. [Ссылка](https://www.oracle.com/database/technologies/xe-downloads.html)
2. Установленный Node.js 14.16 и выше (LTS). [Ссылка](https://www.oracle.com/database/technologies/xe-downloads.html)
3. Установленный yarn. [Ссылка](https://yarnpkg.com/lang/en/docs/install/)
4. Для python установлены библиотеки: [numpy](https://pypi.org/project/numpy/), [pandas](https://pypi.org/project/pandas/), [cx_Oracle](https://pypi.org/project/cx-Oracle/)

Все вышеперечисленные действия выполнять вашему программисту.

## 1. Создание структуры БД

Выполните sql скрипт по пути `db/src/queries/index.sql`. Он создаст все необходимые таблицы, отношения, функции и триггеры.

Packages будет необходимо создавать отдельно. В папке `db/src/queries/packages` для каждого файла сперва создаем _package head_ потом _package body_.

## 2. Заливка данных

Выполните python скрипт по пути `db/src/scrapping/uploader.py`, предварительно изменив информацию по базе:

```py
...
def run(code):
    connection = None
    try:
        connection = oracle.connect(
            "system", # Ваш username
            "oracle", # Ваш password
            "localhost:1521/xe", # Ваш connection String
            encoding="UTF-8"
        )
        return code(connection)
    except oracle.Error as e:
        print(e)
    finally:
        if connection:
            connection.rollback()
            connection.close()
...
```

## 3. Установка зависимостей для api и webapp

В директориях `api` и `webapp` в командной строке выполните `yarn install`

Когда yarn завершит работу, появится папка `node_modules` в обоих директориях.

## 4. Настройка api

Замените информацию для соединения с базой в файле: `api/src/database/database.service.ts`

```ts
@Injectable()
export class DatabaseService {
  private pool: Pool;

  public async init(): Promise<void> {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    try {
      this.pool = await oracledb.createPool({
        user: "system", // Ваш username
        password: "oracle", // Ваш password
        connectionString: "localhost:1521/xe", // Ваш connection string
        poolAlias: "default",
      });
      Logger.log("Database connection established", "DatabaseService");
    } catch (error) {
      Logger.error("Connection error", error.stack, "DatabaseService");
      process.exit(1);
    }
  }

  // Остальной код
}
```

## 5. Запуск api и webapp

Для запуска api, выполните в командой строке: `yarn start:dev`

Для запуска webapp, выполните в командой строке: `yarn serve`
