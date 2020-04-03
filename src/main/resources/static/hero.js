class Hero {
  backpack;

  setBackpack(backpack) {
    this.backpack = backpack
  }
}

class Backpack {
  items = []

  addItem(item) {
    this.items.push(item)
  }
}


let hero = new Hero()
hero.backpack // undefined

hero.setBackpack(new Backpack())
hero.backpack // items: []

hero.backpack.addItem("Sword")