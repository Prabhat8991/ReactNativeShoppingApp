import { fireEvent, render, screen } from '@testing-library/react-native'
import CartItem from '../components/ui/CartItem'

describe('Cart Item', () => {
    it('cart item displayed', () => {
        const onItemAdded = jest.fn().mockName('onItemAdded')
        const onItemRemoved = jest.fn().mockName('onItemRemoved')

        render(<CartItem image='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' price={20} title={'Mens Pant'} quantity={2} onItemAdded={onItemAdded} onItemRemoved={onItemRemoved} />)
        expect(screen.getByText('Mens Pant')).toBeVisible();

        fireEvent.press(screen.getByText('+'));
        expect(onItemAdded).toHaveBeenCalledWith();

        fireEvent.press(screen.getByText('-'));
        expect(onItemRemoved).toHaveBeenCalledWith();
    })
})