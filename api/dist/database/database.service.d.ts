import oracledb from "oracledb";
export declare class DatabaseService {
    private pool;
    init(): Promise<void>;
    getConnection(): Promise<oracledb.Connection>;
    run(callback: (conn: oracledb.Connection) => Promise<any>): Promise<any>;
    callSelectProcedure(conn: oracledb.Connection, name: string, params: oracledb.BindParameters, hasOut?: boolean): Promise<any>;
    callProcedure(conn: oracledb.Connection, name: string, params: oracledb.BindParameters): Promise<any>;
}
