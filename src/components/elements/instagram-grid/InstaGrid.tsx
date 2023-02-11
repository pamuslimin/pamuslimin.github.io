// @flow

import * as React from 'react';
import { Button, createStyles, Group, SimpleGrid } from '@mantine/core';

const useStyles = createStyles(() => ({
    wrapper: {},
    image: {
        width: '100%',
        height: '100%',
    },
}));

export type Props = {
    media?: Array<{
        displayImage: string,
        id?: string,
        postLink?: string,
        accessibilityCaption?: string,
    }>,
    account: string,
    status: 'completed' | 'loading' | 'failed',
};

const InstaGrid = ({ media, account, status }: Props) => {
    return (
        <>

            <script src="https://embedsocial.com/js/iframe.js"></script>
            <iframe style={{ border: 0, width: "100%", height: "100%" }} scrolling="no"
                src="https://embedsocial.com/api/pro_hashtag/7f53b30424eeef6ea7dc4c3467e092fb665515f4"></iframe>
            <script>iFrameResize();</script>
        </>
    );
};

InstaGrid.defaultProps = {
    media: undefined,
};

export default InstaGrid;