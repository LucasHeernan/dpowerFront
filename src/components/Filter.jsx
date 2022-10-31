import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory, orderByPrice, orderByName } from '../redux/actions';

export default function Filter() {

    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const categories = useSelector(store => store.categories)

    const [price, setPrice] = useState('');
    const prices = ["less to more", "more to less"];

    const [byName, setByName] = useState('');
    const abc = ['A - Z', 'Z - A']

    function handlerByCatogory(e) {
        dispatch(filterByCategory(e));
    }

    function handlerPerPrice(e) {
        dispatch(orderByPrice(e));
        alert(e)
    }

    function handlerPerName(e) {
        dispatch(orderByName(e));
        alert(e)
    }

    return (
        <View style={styles.container}>
            <SelectList
                data={categories}
                setSelected={setCategory}
                onSelect={() => handlerByCatogory(category)}
                placeholder='Select Category'
                search={false}
            />
            <SelectList
                data={prices}
                setSelected={setPrice}
                onSelect={() => handlerPerPrice(price)}
                placeholder='Order By Price'
                search={false}
                inputStyles={styles.test}
            />
            <SelectList
                data={abc}
                setSelected={setByName}
                onSelect={() => handlerPerName(byName)}
                placeholder='Order By Name'
                search={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'brown',
        width: '95%'
    },
    test: {
        backgroundColor: 'yellow',
    }

})
