import Card from "./Card";
const Contents = () => {
    return (
        <div className="grid grid-cols-3 gap-20 px-20 py-10 bg-gray-300">
            <Card title="Food-Delivery" subTitle="Fast Delivery" des="Delivery your food" raiting="4.5" />
            
            <Card title="Grocery-Delivery" subTitle="Home Delivery" des="Delivery your Grocery" raiting="4.9" />
            
            <Card title= "Online-Order" subTitle="Easy Order" des="Order your food" raiting="4.8" />
        </div>
)}
export default Contents