const path = require('path');

//module.exports = {
module.exports = (env) => {
	return {
		mode: 'development',
		entry: env.entry, //ファイルをまとめる際のエントリーポイント
		devtool: 'inline-source-map',
		output: {
			filename: 'bundle.js', //まとめた結果出力されるファイル名
//			path: path.resolve(__dirname, 'dist')
			path: env.outdir
	},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'ts-loader', //ts-loader使うよ
					// use: 'ts-loader',
					exclude: /node_modules/
				}
			]
		}
	};
};
