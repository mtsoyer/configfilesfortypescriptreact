import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.resolve();

//entry: the file that is used for develoment. 
//output: path is where the final file will be stored, and it'l be called bundle.js. all our code will be put in this file
const config = {
    mode : "development",
    entry: "./src/index.tsx", 
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "bundle.js"
    },

    //source-maps allow for debugging of typescript code
    //the different devtool options differ on how detailed the error is. but it sacrifices preformance. 
    devtool: "inline-source-map",

    //static - idk. it just gets stored in the dist place. hot means that when we save, it'll automatically refresh
    //compressing is for preformance
    devServer: {
        static: {
            directory : path.join(__dirname, "dist")
        },
        hot : true,
        compress: true,
        port: 9000
    },
    //path.join takes in the root directory, and then the subfolder/file name. 
    //
    plugins : [
        new HtmlWebpackPlugin ({
            template: path.join(__dirname, "public/index.html"),
            minify : {
                removeComments : true,
                minifyCSS : true,
                minifyJS : true,
            }
        })
    ], 
    //this is for babel
    module : {
        rules: [
            {
                include: path.resolve(__dirname, "src"),
                exclude: /(node_modules)/, 
                loader: "babel-loader",
                test : /\.[t]sx?$/, 
                options: {
                    presets : [
                        "@babel/preset-env",
                        ["@babel/preset-react", {"runtime" : "automatic"}],
                        "@babel/preset-typescript"
                    ]
                }

            }
        ]
    }, 
    resolve: {
        extensions : [".ts", ".tsx", ".js", ".jsx"]
    }
}

export default config;