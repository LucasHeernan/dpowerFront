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
                placeholder='Category'
                search={false}
                boxStyles={styles.box}
                inputStyles={styles.test}
            />
            <SelectList
                data={prices}
                setSelected={setPrice}
                onSelect={() => handlerPerPrice(price)}
                placeholder='Order By Price'
                search={false}
                boxStyles={styles.box}
                inputStyles={styles.test}
            />
            <SelectList
                data={abc}
                setSelected={setByName}
                onSelect={() => handlerPerName(byName)}
                placeholder='Order By Name'
                search={false}
                boxStyles={styles.box}
                inputStyles={styles.test}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    box: {
        borderColor: '#B9B9B9',
        borderRadius: 14
    },
    test: {
        fontSize: 12,
        tintColor: '#F6F5F5',
        color: '#777777',
    }
})
