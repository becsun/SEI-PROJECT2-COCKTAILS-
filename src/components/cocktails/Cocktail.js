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
    measures: [],
    combined: []
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
      const combined = []
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
      for (let i = 0; i < this.state.ingredients.length ; i ++){
        combined.push(this.state.ingredients[i] + ' ' + this.state.measures[i] + ' ') 
      } 
      this.setState({ combined: combined  })
      console.log(this.state.combined)
    } catch (err){
      console.log('an error has occured'  + err)
    }
    console.log(this.state.combined)
  }

  // {this.state.info.hours.map(time => {
  //   return <li key={time.day}>{time.day}: {time.times}</li>
  // })}

  //    this.state.measures[i].map((measure) => {
  //   return <li key={measure[i]}>{measure[i]}</li>
  // )}
  // console.log(listItems)
  // }

  clickDrink = () => {
    this.setState({ classbutton: 'buttonImage' })
    this.setState({ measurements: '' })
    this.setState({ message: ' ' })
    return (this.getDrink())
  }
  getRecipe = () => {
    this.setState({ classbutton: 'invisible' })
    this.setState({ message: this.state.combined })
    // {this.state.booze.strInstructions}
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
              <div><h4><p>{this.state.booze.strInstructions}</p></h4>
                <ul>
                  {this.state.combined.map((ingredient) => {
                    return <li key={ingredient.idDrink}>{ingredient}</li>
                  })}
                </ul>

              </div>
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