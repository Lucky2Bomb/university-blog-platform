export default {
    serverPort: 5000,
    secret_key: "ytRWE-Epn213k9404.ss950",
    token_auth_lifetime: "2h",
    file_settings: {
        publication: {
            //in bytes
            max_picture_size: 5242880,
            max_file_size: 15728640,
        },
        profile: {
            max_avatar_size: 1048576,
            max_background_size: 2097152
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