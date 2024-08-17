interface a {
  name : () => void
}

class aa implements a {
  name() {
    console.log('name')
  }
}

const b = new aa()
 b.name()