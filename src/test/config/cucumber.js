module.exports = {
    default:{
        tags: process.env.npm_config_TAGS || "",
        formateOptions:{
            snippentInterface: "async-await"
        },
        paths:[
            "src/test/features/*.feature"
        ],
        publishQuite: true,
        dryRun: false,
        require:[
            "src/test/steps/*.ts",
            "src/test/utils/*.ts"
        ],
        requireModule:[
            "ts-node/register"
        ],
        format:[
            "html:test-result/cucumber-report.html",
            "json:test-result/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2
    },
    rerun:{
        formateOptions:{
            "snippentInterface": "async-await"
        },
        publishQuite: true,
        dryRun: false,
        require:[
            "src/test/steps/*.ts",
            "src/test/utils/*.ts"
        ],
        requireModule:[
            "ts-node/register"
        ],
        format:[
            "html:test-result/cucumber-report.html",
            "json:test-result/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2
    }
}