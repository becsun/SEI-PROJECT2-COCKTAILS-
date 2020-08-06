import React from 'react'
import axios from 'axios'
class Cocktail extends React.Component{
  state={
    booze: null,
    message: ' ',
    ingredients: [],
    measurements: []
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
      console.log({ booze: res.data })
      this.setState({ booze: res.data })
      this.setState({ message: 'All you need to know: It has ' +  this.state.booze.drinks[0].strIngredient1 })
      this.setState({ ingredients: this.state.booze.drinks[0].strMeasure1) })
    } catch (err){
      console.log('an error has occured'  + err)
    }
  } 
  clickDrink = () => {
    return (this.getDrink())
  }
  getRecipe = () => {
    this.setState({ message: this.state.booze.drinks[0].strInstructions })
  }
  getIngredients = () => {
    this.setState({ ingredients: this.state.ingredients.push(this.state.booze.drinks[0].strIngredient1)})
  }

  render(){
    if (!this.state.booze) return null
    console.log(this.state.ingredients)
    return (
      <div className="homestyle">
        <div className="cocktailCard">
          <div className="innercard">
            <div><img src={this.state.booze.drinks[0].strDrinkThumb}></img></div>
            <div className="cocktailText">
              <button onClick={this.clickDrink}>NEXT</button>
              <button onClick={this.getRecipe}>Recipe</button>
              <div><h1>{this.state.booze.drinks[0].strDrink}</h1></div>
              <div><h4>{this.state.message}</h4></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Cocktail