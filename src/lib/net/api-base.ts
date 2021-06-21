export abstract class ApiBase {
    public async after(): Promise<void> { };

    public abstract invoke(): Promise<any>;
}
