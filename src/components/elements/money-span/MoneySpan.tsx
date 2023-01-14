import { Group, Text } from '@mantine/core';
import React from 'react';

type Props = { amount: number; };

const MoneySpan = (props: Props) => {
    return (
        <Group position='apart' px={16}>
            <Text ta="left">Rp. </Text>
            <Text ta="right">{props.amount?.toLocaleString("id-ID", {maximumFractionDigits: 2, useGrouping: true})}</Text> 
        </Group>
    );
};

export default MoneySpan;