import { getAddRemoveButtonSign } from "../components/ui/AddRemoveButton";

describe('getButtonSign', () => {
    it('returns button sign and action', () => {
        const buttonType = 'add'
        const onItemAdded = () => {

        }
        const onItemRemoved = () => {

        }
        const { buttonSign, action } = getAddRemoveButtonSign(buttonType, onItemAdded, onItemRemoved)
        let buttonSignExpected = '+'
        let actionExpected = onItemAdded
        expect(buttonSign).toEqual(buttonSignExpected)
        expect(action).toEqual(actionExpected)
    }
    )
})