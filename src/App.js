import React from 'react';
import './App.css';
import { BlockPicker } from 'react-color';
import p5 from 'p5';

function App() {
  const [ color, setColor ] = React.useState('#000000');
  const [ size, setSize ] = React.useState(55);

  const sketch = React.useRef();
  const canvasParent = React.useRef();

  React.useEffect(() => {
    sketch.current = new p5(p5canvas(canvasParent.current));
  }, []);
  
  const handleChange = (color) => {
    setColor(color.hex);
  }

  const handleSize = (event) => {
    setSize(parseInt(event.target.value));
  }

  const handleCreate = () => {
    sketch.current.addElement({
      size: size,
      col: color,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <section className="App-left">
          <BlockPicker color={color} triangle="hide" onChange={handleChange} />

          <input type="range" min="10" max="100" onInput={handleSize} />

          <button onClick={handleCreate}>Crear</button>
        </section>

        <section className="App-right">
          <div ref={canvasParent}></div>
        </section>

      </header>
    </div>
  );
}

const p5canvas = (domElement) => (app) => {
  
  var list = [];
  
  app.setup = () => {
    var canvas = app.createCanvas(300, 300);
    canvas.parent(domElement);
  }

  app.draw = () => {
    app.background(220);

    list.forEach((elem) => {
      app.fill(elem.col);
      app.ellipse(elem.x, elem.y, elem.size, elem.size);
  
      elem.x += elem.vel;
  
      if(elem.x > app.width + elem.size){
        elem.x = -1 * elem.size - 10;
      }
    })
  }

  app.addElement = (elem) => {
    elem.y = app.random(app.height);
    elem.x = app.random(app.width);
    elem.vel = app.random(3, 10);
    list.push(elem);
  }

}

export default App;
