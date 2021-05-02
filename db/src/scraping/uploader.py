import pandas as pd
import numpy as np
import cx_Oracle as oracle

drugs = pd.read_csv(r"C:\Users\User\Downloads\project\db\src\scraping\drugs.csv")
pharmacies = pd.read_csv(r"C:\Users\User\Downloads\project\db\src\scraping\pharmacies.csv")
drugs_to_ph = pd.read_csv(r"C:\Users\User\Downloads\project\db\src\scraping\drugs_to_ph.csv")
drugs_analogs = pd.read_csv(r"C:\Users\User\Downloads\project\db\src\scraping\drugs_analogs.csv")

pharmacies = pharmacies.replace({np.nan: None})
drugs = drugs.replace({np.nan: None})
drugs["status"] = drugs["status"].apply(
    lambda x: "no_recipe" if x == "Без рецепта" else "recipe")
drugs_to_ph = drugs_to_ph.replace({np.nan: None})
drugs_analogs = drugs_analogs.replace({np.nan: None})


def run(code):
    connection = None
    try:
        connection = oracle.connect(
            "system",
            "mir26012002",
            "localhost:1521/xe",
            encoding="UTF-8"
        )
        return code(connection)
    except oracle.Error as e:
        print(e)
    finally:
        if connection:
            connection.rollback()
            connection.close()


def add_pharmacies(conn):
    cur = conn.cursor()
    arr = [tuple(x) for x in pharmacies.values]
    cur.executemany(
        "insert into pharmacies values(:1, :2, :3, :4, :5, :6)", arr, batcherrors=True)
    for error in cur.getbatcherrors():
        print("Error", error.message, "at row offset", error.offset)
    conn.commit()


def add_drugs(conn):
    cur = conn.cursor()
    arr = [tuple(x) for x in drugs[["key", "title", "status"]].values]
    cur.executemany("insert into drugs values(:1, :2, :3)",
                    arr, batcherrors=True)
    for error in cur.getbatcherrors():
        print("Error", error.message, "at row offset", error.offset)
    conn.commit()


def add_drugs_to_ph(conn):
    cur = conn.cursor()
    arr = [tuple(x) for x in drugs_to_ph.values]
    cur.executemany(
        "insert into drugs_to_ph values(:1, :2, :3, :4)", arr, batcherrors=True)
    for error in cur.getbatcherrors():
        print("Error", error.message, "at row offset", error.offset)
    conn.commit()


def add_drugs_analogs(conn):
    cur = conn.cursor()
    arr = [(int(x[0]), int(x[1]), int(x[2])) for x in drugs_analogs.values]
    cur.executemany(
        "insert into drugs_analogs values(:1, :2, :3)", arr, batcherrors=True)
    for error in cur.getbatcherrors():
        print("Error", error.message, "at row offset", error.offset)
    conn.commit()


run(add_pharmacies)
# run(add_drugs)
# run(add_drugs_to_ph)
# run(add_drugs_analogs)
