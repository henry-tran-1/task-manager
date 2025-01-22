import { useFruits } from '../hooks/useFruits.ts'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className=" text-2xl">Fullstack Boilerplate - with Fruits!</h1>
        <p className="bg-green-300 text-2xl text-red-900">test</p>
        <h2 className="bg-gray-400">another test</h2>
        <h3 className="text-3xl bg-blue-800">yet another</h3>
        <h4 className="text-lg text-white bg-green-950">one last test</h4>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
    </>
  )
}

export default App
