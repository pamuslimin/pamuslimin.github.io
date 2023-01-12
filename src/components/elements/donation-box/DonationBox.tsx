import { ActionIcon, Card, Container, CopyButton, Group, Image, Stack, Table, Text, Title, Tooltip } from '@mantine/core';
import React from 'react';
import QAR from "@/assets/QAR.png";
import { Check, Copy } from 'phosphor-react';
import { useMatch } from '@tanstack/react-location';
type Props = {};

type Donation = {
    id: string;
    name: string;
    amount: string;
    date_created: Date;
};

type BankAccount = {
    id: string;
    holderName: string;
    bankNumber: string;
    bankName: string;
};

const donations: Donation[] = [
    {
        id: "1",
        name: "Budi Gunawan",
        amount: "Rp.1.000.000,-",
        date_created: new Date(),
    },
    {
        id: "2",
        name: "Hamba Allah",
        amount: "Rp.6.000.000,-",
        date_created: new Date()
    }, {
        id: "3",
        name: "Hamba Allah",
        amount: "Rp.3.000.000,-",
        date_created: new Date()
    }, {
        id: "4",
        name: "Fulan",
        amount: "Rp.9.000.000,-",
        date_created: new Date()
    }, {
        id: "5",

        name: "Fulanah",
        amount: "Rp.4.500.000,-",
        date_created: new Date()
    }
];
 

const DonationBox = (props: Props) => {
    const {
        data: {
            bankNumbers,
        }
    }= useMatch();
    const bankNumbs = bankNumbers as Array<any> || [];
    return (
        <Container size="md" bg={"green"} p={16} mih={700}>
            <Title order={2} my={20} color="white">Mulai Berdonasi</Title>
            <Card w="100%" h={220} withBorder radius='md'>

                <Group align="center" h={170} >
                    <Text color={'dimmed'}>Anda dapat melakukan scan pada qr berikut untuk berdonasi melalui Ovo, Untuk melakukan donasi via transfer bank, kami menyediakan beberapa pilihan bank yaitu sebagai berikut :</Text>
                    <Image src={QAR} height='110px' width="110px" />
                    <Group>
                        {
                            bankNumbs?.map((number) => (<Card shadow="xs" key={number.bankNumber}>
                                <Group>
                                    <Text color="blue">{number.bankname}</Text>
                                    <CopyButton value={number.banknumber} timeout={2000}>
                                        {({ copied, copy }) => (
                                            <Tooltip label={copied ? 'Disalin ke clipboard' : 'Salin Nomor'} withinPortal withArrow position="right">
                                                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                                </ActionIcon>
                                            </Tooltip>
                                        )}
                                    </CopyButton>
                                </Group>
                                <Text color="dark">{number.banknumber}</Text>
                                <Text color="dimmed">{number.holdername}</Text>
                            </Card>))
                        }
                    </Group>
                </Group>

            </Card>


            <Card mt={16} shadow="sm" p={0} withBorder style={{ minHeight: 700 }}>
                <Text ta="center" size={18} p={12}>
                    Terimakasih kepada para donatur yang sudah berdonasi.</Text>

                <Table cellSpacing="lg" verticalSpacing={"md"}>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nama</th>
                            <th>Nominal</th>
                            <th>Tanggal Diterima</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donations.map(donation => ( 

                                    <tr key={donation.id}>
                                        <td> {donation.id} </td>
                                        <td> {donation.name} </td>
                                        <td> {donation.amount} </td>
                                        <td> {donation.date_created.toLocaleString()}</td>
                                    </tr> 
                            ))
                        }
                    </tbody>
                </Table></Card>
        </Container>
    );
};

export default DonationBox;