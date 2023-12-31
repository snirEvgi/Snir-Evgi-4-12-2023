import { ProgressSpinner } from "primereact/progressspinner"

const Loader = () => {
  return (
    <div className="flex z-50 absolute inset-0 mx-auto my-auto justify-center items-center ">
      <ProgressSpinner />
    </div>
  )
}

export default Loader
