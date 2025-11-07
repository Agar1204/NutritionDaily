import { ListGroup, Badge, Button } from "react-bootstrap"

export default function FoodItem(props) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>
                <div className="fw-bold">{props.food_name}</div>
                <small className="text-muted">
                    {props.serving_qty} {props.unit}
                </small>
            </div>
            <Badge bg="success">
                {Math.round(props.cals)} kcal <br />
                {Math.round(props.fat)}g of fat <br />
                {Math.round(props.protein)}g of protein <br />
                {Math.round(props.carbs)}g of carbohydrates
            </Badge>
            {props.showAddButton && props.updateable && (
                <Button 
                    variant= "secondary"
                    size="sm"
                    onClick={() => props.onClick(props.food)} 
                >
                    +
                </Button>
            )}

            {!props.showAddButton && props.updateable && (
                <Button
                    variant= "secondary"
                    size="sm"
                    onClick={() => props.onClick(props.food) }
                >
                    x
                </Button> 
            )}

            {props.showSaveButton && (
                <Button variant= "secondary" size="sm" onClick={() => props.saveFood(props.food) } >
                    ♡
                </Button>
            )}
        </ListGroup.Item>
    )
}