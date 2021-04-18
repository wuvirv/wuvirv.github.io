import './App.css';
import { useState } from 'react'
import ReactFileReader from 'react-file-reader'

function App() {
  const date = new Date()

  const [time, setTime] = useState([date.getHours().toString().padStart(2, '0'), date.getMinutes().toString().padStart(2, '0')])
  const [isFocus, setisFocus] = useState(false)
  const [isbgBox, setisbgBox] = useState(false)
  const [isdesk, setisdesk] = useState(false)
  const [selected, setSelected] = useState(localStorage.getItem('selected') ? localStorage.getItem('selected') : '0')

  if (window.timer) {
    clearTimeout(window.timer)
  }
  window.timer = setTimeout(() => {
    setTime([date.getHours().toString().padStart(2, '0'), date.getMinutes().toString().padStart(2, '0')])
  }, 1000)

  function select(e, v) {
    e.stopPropagation()
    localStorage.setItem('selected', v)
    setSelected(v)
    document.querySelector('#input').focus()
  }

  function allClick(e) {
    if (e.target.childNodes.length !== 0) {
      setisFocus(true)
      setisbgBox(true)
    } else {
      setisFocus(false)
      document.removeEventListener('click', allClick)
    }
  }

  function search(e) {
    if (e.keyCode === 13) {
      const q = e.target.value
      switch (selected) {
        case '0':
          window.open('https://www.baidu.com/s?word=' + q)
          break;
        case '1':
          window.open('https://cn.bing.com/search?q=' + q)
          break;
        case '2':
          window.open('https://www.google.com/search?q=' + q)
          break;
        default:
          break;
      }
    }
  }

  document.onkeydown = e => {
    e.stopPropagation()
    const input = document.querySelector('#input')
    if (e.code === 'Escape') {
      setisFocus(false)
      setisbgBox(false)
      input.blur()
      input.placeholder = 'Search'
    } else if (e.code.indexOf('Key') !== -1) {
      setisFocus(true)
      setisbgBox(true)
      setTimeout(() => {
        input.focus()
      }, 0);
    }
  }

  document.onclick = e => {
    e.stopPropagation()
    setisdesk(!isdesk)
  }

  function readFile (img) {
    try {
      localStorage.setItem('img', img.base64)
    } catch (error) {
      alert('图片大小不能超过3M')
    }
  }

  return (
    <div className="App">
      <img id="bg" className={ isbgBox ? 'bgbox foucs' : 'bgbox' } style={{transform: isbgBox ? 'scale(1.1)' : 'scale(1)'}} alt="" src={ localStorage.getItem('img') ? localStorage.getItem('img') : "https://cdn.jsdelivr.net/gh/MobiusBeta/assets/images/BG_A_Default_3.jpg"}></img>
      <div id="cover" className="cover" onClick={ e => {
        if (isFocus) {
          e.stopPropagation();
          setisFocus(false)
          document.querySelector('#input').placeholder = 'Search'
        }
        setisbgBox(false)
      } } ></div>
      <div id="time" className="Time" style={{ visibility: isdesk ? 'hidden' : 'visible', opacity: isdesk ? '0' : '1' }} onClick={ e => e.stopPropagation() }>
        {/* <input className="upload" type="file" accept="image/png,image/gif,image/jpeg" onChange={ e => console.log(e) } /> */}
        <ReactFileReader fileTypes={[".jpg",".png",".gif"]} base64={true} handleFiles={ readFile }>
        <h1>{ time[0] }<span> : </span>{ time[1] }</h1>
        </ReactFileReader>
      </div>
      <input id="input" className={ isFocus ? 'Search input' : 'Search' } style={{ visibility: isdesk ? 'hidden' : 'visible', opacity: isdesk ? '0' : '1' }} type="text" placeholder="Search" autoComplete="off" size="30"
        onClick= { e => e.stopPropagation() }
        onFocus={ e => {
          e.target.placeholder = '' 
          setisFocus(true)
          setisbgBox(true)
        } }
        onBlur={ e => {
          document.addEventListener('click', allClick)
          e.target.value = ''
        } }
        onKeyDown={ e => search(e) }
      />
      <div id="engin" className="engine" style={{ display: isFocus ? 'block' : 'none' }}>
			  <span className={ selected === '0' ? 'searchOpt selected' : 'searchOpt' } onClick={ (e) => select(e, '0') }>
          <svg className="engine_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M412.54 94.74c13.82-2.69 28.21 0.67 40.52 7.13 18.32 10.72 32.2 27.86 41.03 46.99 18.82 40.57 19.04 88.91 2.38 130.23-7.83 18.05-19.17 35.23-35.44 46.7-14.17 10.44-32.65 15.51-50.08 12.14-14.7-2.84-28.09-10.75-38.4-21.51-16.41-16.26-26.44-37.85-32.21-59.97-7.82-32.14-6.07-66.64 5.6-97.63 7.58-20.05 19.98-38.77 37.36-51.6 8.68-6.21 18.62-10.89 29.24-12.48zM642.54 112.74c14.09-3.24 28.43 1.98 40.47 9.09 12.5 7.77 23.39 18.14 31.82 30.2 13.27 17.99 21.69 39.65 23.54 61.95 1.2 20.12-4.42 39.95-11.88 58.44-8.6 20.17-20.6 39.39-37.41 53.73-11.2 9.99-25.06 17.06-39.91 19.51-15.25 2.42-31.08 0-45.41-5.48-16.19-6.35-29.7-18.93-37.51-34.43-9.97-19.57-12.73-42-12.38-63.72 0.38-12.08 1-24.34 4.57-35.97 5.44-18.49 15.28-35.39 26.82-50.71 9.67-12.59 21.15-23.86 34.29-32.81 7.03-4.53 14.79-8.01 22.99-9.8zM228.55 276.76c14.19-2.87 29.11-0.38 42.36 5.14 27.56 12.82 48.47 37.44 59.87 65.31 4.69 11.29 5.89 23.58 6.5 35.67 1.23 21.99-0.51 44.34-7.05 65.44-5.65 17.81-15.84 34.6-30.88 46-15.06 11.23-33.63 17.35-52.32 18.33-20.48 1.2-41.53-6-56.36-20.3-14.41-13.11-24.12-30.65-30.28-48.96-6.19-18.39-9.2-38.17-6.38-57.49 3.11-23.27 9.52-46.34 20.89-66.98 5.74-10.16 12.93-19.57 21.82-27.18 9.15-7.51 20.19-12.76 31.83-14.98zM773.09 335.14c16.95-1.24 34.45 1.2 49.77 8.79 16.02 7.8 28.92 21.02 38.19 36.07 10.21 17.52 16.89 37.52 16.85 57.94 0.51 21.72 0.12 43.77-5.45 64.91-4.39 15.87-11.71 31.45-23.77 42.96-14.07 13.2-33.49 19.59-52.57 19.96-19.19 0.57-39.12-0.89-56.7-9.27-17.16-7.33-30.5-22.16-37.31-39.39-7.85-19.67-9.44-41.14-9.35-62.12-0.01-24.34 2.7-49.22 12.47-71.74 6.11-13.99 15.56-26.85 28.47-35.25 11.5-8.11 25.55-11.68 39.4-12.86zM499.58 415.76c19.31-2.26 39.11 0.99 56.87 8.84 27.51 12.15 49.18 34.47 65.89 59.02 21.56 32.4 47.59 61.52 74.73 89.3 23.38 23.32 47.52 45.93 72.92 67.05 5.74 4.96 11.94 9.4 17.25 14.85 18.04 18.41 29.75 42.69 33.91 68.05 5.31 31.4-1.18 63.71-13.33 92.79-8.36 21.32-23.98 39.76-43.85 51.21-21.13 12.43-45.72 17.37-69.93 18.95-34.13 1.93-68.29-3.36-101.12-12.43-41.83-13.18-86.85-16.16-130.03-8.51-21.43 4.49-42.94 8.86-64.77 10.85-26.62 2.82-53.48 3.1-80.2 1.62-19.06-0.37-38.15-5.73-54.21-16.1-17.72-10.45-31.47-26.56-41.39-44.4-8.27-15.27-13.79-31.93-17.34-48.89-5.11-24.73-3.54-50.94 5.59-74.56 12.72-33.67 37.73-61.18 65.64-83.21 6.93-5.78 14.54-10.69 21.4-16.56 14.15-13.89 29.74-26.2 43.84-40.14 21.96-21.36 42.44-44.56 58.28-70.89 20.78-35.88 58.42-62.08 99.85-66.84z" ></path></svg>
        </span>
        <span className={ selected === '1' ? 'searchOpt selected' : 'searchOpt' } onClick={ (e) => select(e, '1') }>
          <svg className="engine_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M367.616 127.08864L167.12192 66.56v741.4528L367.616 626.432zM167.12192 808.0128L367.616 957.44l489.26208-296.96V424.6784z" fill="#ffffff" p-id="16737"></path><path d="M425.6256 288.49152l95.82592 208.06144 116.93056 49.55648 218.496-121.43104-426.2144-136.18688z" ></path></svg>
        </span>
        <span className={ selected === '2' ? 'searchOpt selected' : 'searchOpt' } onClick={ (e) => select(e, '2') }>
          <svg className="engine_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" ></path></svg>
        </span>
		  </div>
    </div>
  );
}

export default App;
