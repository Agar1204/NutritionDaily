import { ListGroup, Badge, Button } from "react-bootstrap"

export default function FoodItem({food, onClick, showAddButton = true}) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>
                <div className="fw-bold">{food.food_name}</div>
                <small className="text-muted">
                    {food.serving_qty} {food.serving_unit}
                </small>
            </div>
            <Badge bg="success">
                {Math.round(food.nf_calories)} kcal <br />
                {Math.round(food.nf_total_fat)}g of fat <br />
                {Math.round(food.nf_protein)}g of protein <br />
                {Math.round(food.nf_total_carbohydrate)}g of carbohydrates
            </Badge>
            
            {showAddButton && (
                <Button 
                    variant= "secondary"
                    size="sm"
                    onClick={() => onClick(food)} 
                >
                    +
                </Button>
            )}

            {!showAddButton && (
                <Button
                    variant= "secondary"
                    size="sm"
                    onClick={() => onClick(food) }
                >
                    x
                </Button> 
            )}
        </ListGroup.Item>
    )
}