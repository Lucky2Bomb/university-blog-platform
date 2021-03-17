export default {
    serverPort: 5000,
    secret_key: "ytRWE-Epn213k9404.ss950",
    token_auth_lifetime: "2h",
    file_settings: {
        publication: {
            //in bytes
            max_picture_size: 5242880,
            max_file_size: 15728640,
        }
    },
    database: {
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234_Airat_qwerTy',
        database: 'university-blog-platform',
        timezone: '+00:00',
    },
    pagination_settings: {
        max_count: 50,
    }
}