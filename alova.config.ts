export default {
    // api生成设置数组，每项代表一个自动生成的规则，包含生成的输入输出目录、规范文件地址等等
    generator: [
        {
            input: 'openai.swagger.json',
            // （可选）platform为支持openapi的平台，目前只支持swagger，默认为空
            // 当指定了此参数后，input字段只需要指定文档的地址而不需要指定到openapi文件
            platform: 'swagger',

            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/api/openai',

            // （可选）指定生成的响应数据的mediaType，以此数据类型来生成2xx状态码的响应ts格式，默认application/json
            responseMediaType: 'application/json',

            // （可选）指定生成的请求体数据的bodyMediaType，以此数据类型来生成请求体的ts格式，默认application/json
            bodyMediaType: 'application/json',

            // （可选）指定生成的api版本，默认为auto，会通过当前项目安装的alova版本判断当前项目的版本，如果生成不正确你也可以自定义指定版本
            version: 'auto',

            /**
             * （可选）生成代码的类型，可选值为auto/ts/typescript/module/commonjs，默认为auto，会通过一定规则判断当前项目的类型，如果生成不正确你也可以自定义指定类型：
             * ts/typescript：意思相同，表示生成ts类型文件
             * module：生成esModule规范文件
             * commonjs：表示生成commonjs规范文件
             */
            type: 'ts',

            /**
             * 全局导出的api名称，可通过此名称全局范围访问自动生成的api，默认为`Apis`，配置了多个generator时为必填，且不可以重复
             */
            global: 'Openais',

            /**
             * 全局api对象挂载的宿主对象，默认为 `globalThis`，在浏览器中代表 `window`，在nodejs中代表 `global`
             */
            globalHost: 'globalThis',
        },
        {
            input: 'gemini.swagger.json',
            // （可选）platform为支持openapi的平台，目前只支持swagger，默认为空
            // 当指定了此参数后，input字段只需要指定文档的地址而不需要指定到openapi文件
            platform: 'swagger',

            // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
            output: 'src/api/gemini',

            // （可选）指定生成的响应数据的mediaType，以此数据类型来生成2xx状态码的响应ts格式，默认application/json
            responseMediaType: 'application/json',

            // （可选）指定生成的请求体数据的bodyMediaType，以此数据类型来生成请求体的ts格式，默认application/json
            bodyMediaType: 'application/json',

            // （可选）指定生成的api版本，默认为auto，会通过当前项目安装的alova版本判断当前项目的版本，如果生成不正确你也可以自定义指定版本
            version: 'auto',

            /**
             * （可选）生成代码的类型，可选值为auto/ts/typescript/module/commonjs，默认为auto，会通过一定规则判断当前项目的类型，如果生成不正确你也可以自定义指定类型：
             * ts/typescript：意思相同，表示生成ts类型文件
             * module：生成esModule规范文件
             * commonjs：表示生成commonjs规范文件
             */
            type: 'ts',

            /**
             * 全局导出的api名称，可通过此名称全局范围访问自动生成的api，默认为`Apis`，配置了多个generator时为必填，且不可以重复
             */
            global: 'Geminis',

            /**
             * 全局api对象挂载的宿主对象，默认为 `globalThis`，在浏览器中代表 `window`，在nodejs中代表 `global`
             */
            globalHost: 'globalThis',
        },
    ],
};