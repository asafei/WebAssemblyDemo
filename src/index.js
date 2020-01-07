function component() {
	var element = document.createElement('div');
	element.style.position = 'absolute';
	element.style.overflow = 'hidden';
	element.style.width = '100%';
	element.style.height = '100%';
	element.style.background='red';
	return element;
}
document.body.appendChild(component());
const getExportFunction = async (url) => {
    const env = {
      memoryBase: 0,
      tableBase: 0,
      memory: new WebAssembly.Memory({
        initial: 256
      }),
      table: new WebAssembly.Table({
        initial: 2,
        element: 'anyfunc'
      })
    };
    const instance = await fetch(url).then((response) => {
      return response.arrayBuffer();
    }).then((bytes) => {
      return WebAssembly.instantiate(bytes, {env: env})
    }).then((instance) => {
      return instance.instance.exports;
    });
    return instance;
  };

const test = async () => {
    const wasmUrl = 'http://0.0.0.0:3030//math.wasm';
    const { add,minus,multiply } = await getExportFunction(wasmUrl);
    console.log('200+100=',add(200,100));
    console.log('200-100=',minus(200,100));
    console.log('200*100=',multiply(200,100));
    alert('打开控制台查看');
  };

test();
