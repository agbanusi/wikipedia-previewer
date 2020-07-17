
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value:'',
      result:[]
    }
    this.search=this.search.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.clear =this.clear.bind(this)
  }
  search(event,val){
    //console.log(this.state.value)
    let value= val? val: this.state.value
    event.preventDefault();
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch='+value).then(response=>response.json()).then(data=>{
      //console.log(data)
      this.setState({
        result:data.query.search
        })
    }).catch(err=>console.log(err))
  }
  handleChange(e){
    this.setState({
      value:e.target.value
    })
    this.search(e,e.target.value)
  }
  clear(){
    this.setState({
      value:''
    })
  }
  
  render() {
    //console.log(this.state.result)
    var bee=''
    this.state.result.map((i,index)=>{
          let url='https://en.wikipedia.org/wiki/'+encodeURI(i.title)
          bee+= "<div class='card'><a href="+url+" target=_blank><h3>"+i.title+"</h3><hr><p>"+i.snippet+"</p></a></div>"
          })
    //console.log(bee)
    if(bee){document.getElementById('top').innerHTML=bee}
    return (
      <div className='body'>
        <h2> Wikipedia Previewer</h2>
        <div className='search'>
        <form onSubmit={this.search}>
          <input type='text' onChange={this.handleChange} value={this.state.value} />
          <button type='reset' className='x' onClick={this.clear}>x</button>
          <button type='submit'><i className="fas fa-search" /></button>
          <button><a href='https://en.wikipedia.org/wiki/Special:Random' target='_blank'><i className="fas fa-random"></i></a></button>
        </form>
        </div>
        <div id='top' />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
