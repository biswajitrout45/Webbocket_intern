

const Card = ({title, subTitle, des, raiting
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-4xl font-semibold">{title}</h2>
        <h4 className="text-2xl">{subTitle}</h4>
        <p>{des}</p>
        <p>{raiting}</p>
    </div>
  )
}

export default Card;