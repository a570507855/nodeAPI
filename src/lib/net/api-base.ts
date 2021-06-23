export abstract class ApiBase {
    public $file: Express.Multer.File | undefined;

    public $files: Express.Multer.File[] | undefined;

    public $query: any;

    public async after(): Promise<void> { };

    public abstract invoke(): Promise<any>;
}
