import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const AddToCartIcon = ({ badgeColor, cartColor, iconButtonColor, iconButtonStyle, quantity }) => {

    return (
        <Badge badgeContent={quantity} color={badgeColor}>
            <IconButton aria-label='add-to-cart' color={iconButtonColor} style={iconButtonStyle}>
                <AddShoppingCartIcon color={cartColor} />
            </IconButton>
        </Badge>
    );
}

AddToCartIcon.propTypes = {
    badgeColor: PropTypes.string,
    cartColor: PropTypes.string,
    iconButtonColor: PropTypes.string,
    iconButtonStyle: PropTypes.object,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export const AddItem = ({ color, fontSize, onClick, style, title, variant }) => {

    return (
        <Button color={color} onClick={onClick} style={style} variant={variant}>
            <AddIcon fontSize={fontSize} titleAccess={title} />
        </Button>
    );
}

AddItem.propTypes = {
    color: PropTypes.string,
    fontSize: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
    variant: PropTypes.string
}

export const CartIcon = ({ onMouseEnter, onMouseLeave, style }) => {

    return (
        <IconButton aria-label='cart-icon' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style}>
            <ShoppingCartIcon />
        </IconButton>
    );
}

CartIcon.propTypes = {
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    style: PropTypes.object
}

export const CheckedIcon = ({ color, fontSize, style, title }) => {

    return (
        <CheckIcon color={color} fontSize={fontSize} style={style} titleAccess={title} />
    );
}

CheckedIcon.propTypes = {
    color: PropTypes.string,
    fontSize: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string
}

export const Close = ({ color, onClick, onMouseEnter, onMouseLeave, style }) => {

    return (
        <CloseIcon color={color} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} titleAccess='Cerrar' />
    );
}

Close.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    style: PropTypes.object
}

export const RemoveItem = ({ color, fontSize, onClick, style, title, variant }) => {

    return (
        <Button color={color} onClick={onClick} style={style} variant={variant} >
            <RemoveIcon fontSize={fontSize} titleAccess={title} />
        </Button>
    );
}

RemoveItem.propTypes = {
    color: PropTypes.string,
    fontSize: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
    variant: PropTypes.string
}

export const RemoveItemIcon = ({ color, fontSize, onClick, style, title }) => {

    return (
        <DeleteIcon color={color} fontSize={fontSize} onClick={onClick} style={style} titleAccess={title} />
    );
}

RemoveItemIcon.propTypes = {
    color: PropTypes.string,
    fontSize: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string
}