import React from 'react'
import axios from 'axios'
import check from '../common/images/check.png'
import cross from '../common/images/cross.png'
class Cocktail extends React.Component{
  state={
    booze: null,
    message: ' ',
    measurements: '',
    classbutton: 'buttonImage',
    ingredients: [],
    measures: []
  }
  async componentDidMount() {
    try {
      await this.getDrink()
    } catch (err){
      console.log('an error has occured'  + err)
    }
  }
  getDrink = async() => {
    try {
      const res = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      const booze = res.data.drinks[0]
      const ingredients = []
      const measures = []
      for (const key in booze) {
        if (key.startsWith('strIngredient')){
          ingredients.push(booze[key])
        }
      } console.log(ingredients.filter(i => i))
      this.setState({ booze , ingredients: ingredients.filter(i => i) })
      for (const key in booze) {
        if (key.startsWith('strMeasure')){
          measures.push(booze[key])
        }
      } console.log(measures.filter(i => i))
      this.setState({ booze , measures: measures.filter(i => i) })
      this.setState({ booze: res.data.drinks[0] })
    } catch (err){
      console.log('an error has occured'  + err)
    }

    for (const key in measures) {
      if (key.startsWith('strIngredient')){
        ingredients.push(booze[key])
      }
    }






  }
  clickDrink = () => {
    this.setState({ classbutton: 'buttonImage' })
    this.setState({ measurements: '' })
    return (this.getDrink())
  }
  getRecipe = () => {
    this.setState({ classbutton: 'invisible' })


    // this is a cheeky placeholder after all the failed maps, filters and for loops
    // this.setState({ message: this.state.booze.drinks[0].strInstructions })
    // this.setState({ measurements: this.state.booze.drinks[0].strIngredient1 + ' ' + this.state.booze.drinks[0].strMeasure1 + 
    // ' , ' +  this.state.booze.drinks[0].strIngredient2 + ' ' + this.state.booze.drinks[0].strMeasure2 + ' ' })
  }
  render(){
    if (!this.state.booze) return null
    return (
      <div className="homestyle">
        <div className="cocktailCard">
          <div className="innercard">
            <div><img src={this.state.booze.strDrinkThumb}></img></div>
            <div className="cocktailText">
              <div><h2>{this.state.booze.strDrink}</h2></div>
              <div><h4>{this.state.message}<p>{this.state.measurements}</p></h4></div>
              <div className="buttonDiv">
                <img className ="buttonImage" src={cross} width="50" height="50" onClick={this.clickDrink}></img>
                <img id ="checkmark" className ={this.state.classbutton} src={check} width="50" height="50"  onClick={this.getRecipe}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Cocktail