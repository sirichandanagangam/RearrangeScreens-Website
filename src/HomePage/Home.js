import React, { useState } from 'react'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { app } from '../Fire'

const data = [
  {
    current: 1,
    one: 2,
    two: 9,
    path: 'images/screen1.png'
  }, {
    current: 2,
    one: 3,
    two: 4,
    path: 'images/screen2.png'
  }, {
    current: 3,
    one: 5,
    two: -1,
    path: 'images/screen3.png'
  }, {
    current: 4,
    one: 6,
    two: -1,
    path: 'images/screen4.png'
  }, {
    current: 5,
    one: 7,
    two: -1,
    path: 'images/screen5.png'
  }, {
    current: 6,
    one: 8,
    two: -1,
    path: 'images/screen6.png'
  }, {
    current: 7,
    one: 0,
    two: -1,
    path: 'images/screen7.png'
  }, {
    current: 8,
    one: 0,
    two: -1,
    path: 'images/screen8.png'
  }, {
    current: 9,
    one: 10,
    two: -1,
    path: 'images/screen9.png'
  }, {
    current: 10,
    one: 11,
    two: -1,
    path: 'images/screen10.png'
  }, {
    current: 11,
    one: -1,
    two: -1,
    path: 'images/screen11.png'
  }
]

const Home = () => {
  const db = getFirestore(app)

  // to read screen which we need to replace
  const [p1, setp1] = useState()
  const [p2, setp2] = useState()

  async function addOrder () {
    const washingtonRef = doc(db, 'ScreenOrder', 'order2')

    try {
      await updateDoc(washingtonRef, {
        arr: data
      })

      alert('done')
    } catch (e) {
      alert('error ' + e)
    }
  }

  async function replaceScreens () {
    const tempCurrent = data[p1 - 1].current
    const tempPath = data[p1 - 1].path

    data[p1 - 1].current = data[p2 - 1].current
    data[p1 - 1].path = data[p2 - 1].path

    data[p2 - 1].current = tempCurrent
    data[p2 - 1].path = tempPath

    document.getElementById(data[p1 - 1].current).src = data[p2 - 1].path
    document.getElementById(data[p2 - 1].current).src = data[p1 - 1].path

    addOrder()
  }

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Update Screens</h1>

      <div class='screen_images'>
        <div class='s1'><img src='images/screen1.png' alt='' id='1' /></div>
        <div class='s2'><img src='images/screen2.png' alt='' id='2' /></div>
        <div class='s9'><img src='images/screen9.png' alt='' id='9' /></div>
        <div class='s3'><img src='images/screen3.png' alt='' id='3' /></div>
        <div class='s4'><img src='images/screen4.png' alt='' id='4' /></div>
        <div class='s10'><img src='images/screen10.png' alt='' id='10' /></div>
        <div class='s5'><img src='images/screen5.png' alt='' id='5' /></div>
        <div class='s6'><img src='images/screen6.png' alt='' id='6' /></div>
        <div class='s11'><img src='images/screen11.png' alt='' id='11' /></div>
        <div class='s7'><img src='images/screen7.png' alt='' id='7' /></div>
        <div class='s8'><img src='images/screen8.png' alt='' id='8' /></div>
      </div>

      <p>Enter the number of the screen which you need to replace like 1 or 2 or 3 or 4</p>

      <label>Screen Number 1 </label>
      <input
        type='text' value={p1} name='p1' onChange={(x) => {
          setp1(x.target.value)
        }} placeholder='number 1'
      />
      <label>Screen Number 2</label>
      <input
        type='text' value={p2} name='p2' onChange={(x) => {
          setp2(x.target.value)
        }} placeholder='number 2'
      />

      <button onClick={() => replaceScreens()}>Replace</button>

      <button onClick={() => addOrder()}>Reset</button>

    </div>
  )
}

export default Home
