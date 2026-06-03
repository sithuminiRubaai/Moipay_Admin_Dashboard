export{

}

declare global{
    namespace NodeJS{
        interface processEnv{
            BROWSER: "chrome" | "firefox" | "webkit"
            ENV: "stag" | "test" | "prod"
        }
    }
}