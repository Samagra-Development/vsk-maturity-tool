import styles from './index.module.scss'
import { Form, Input, Button, Select } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { getQuestions, saveToHasura } from '@/xhr/api';
//@ts-ignore
import Lottie from 'react-lottie';
//@ts-ignore
import * as confetti from 'public/lottie/confetti.json';
import CommonModal from '../CommonModal'
import { Table } from 'semantic-ui-react'
import useMobile from '@/hooks/useMobile';
import EmailValidator from 'email-validator';
import { Page, Text, View, Document, PDFDownloadLink } from '@react-pdf/renderer';
import { pdfStyles } from './pdfStyleSheet';

const MATURITY_INDEX: any = {
    'Starter': 0,
    'Silver': 1,
    'Gold': 2,
    'Platinum': 3
}

export default function VSKForm() {
    let tempState: any = { name: '', email: '', mobile: '', organization: '' };
    const [formState, setFormState] = useState<any>({});
    const [questionData, setQuestionData] = useState<any>([]);
    const [formErrors, setErrors] = useState<any>({});
    const [maturityLevel, setMaturityLevel] = useState<any>(null);
    let tempQuestionsMap: any = {};
    const [questionsMap, setQuestionsMap] = useState<any>({});
    const isMobile = useMobile();
    const [validEmail, validateEmail] = useState(true);
    const [validMobile, validateMobile] = useState(true);

    // Lottie Options
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: confetti,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        getFormQuestions();
    }, [])


    const handleSubmit = () => {
        let finalMaturity = [3, 'Platinum'];
        let errorState: any = {};
        Object.keys(tempState).forEach((t) => {
            if (!formState[t]) errorState[t] = true;
        })
        setErrors(errorState)
        if (Object.keys(errorState)?.length > 0) return;

        Object.keys(formState).forEach(el => {
            let level = formState[el].split('_')?.[1]
            if (level) {
                console.log(level, MATURITY_INDEX[level]);
                if (MATURITY_INDEX[level] < finalMaturity[0]) {
                    finalMaturity[0] = MATURITY_INDEX[level]
                    finalMaturity[1] = level
                }
            }
        })

        // Submitting Data to Hasura
        saveToHasura(formState, finalMaturity[1]);
        setQuestionsMap(tempQuestionsMap)
        setMaturityLevel(finalMaturity[1])
    }

    const resetState = () => {
        setMaturityLevel(null);
        setFormState({})
        setErrors({})
        setQuestionsMap({})
        tempQuestionsMap = {}
        tempState = {}
    }

    const getFormQuestions = async () => {
        let questions = await getQuestions();
        if (questions) setQuestionData(questions.vsk_sets);
    }

    const findImprovementAreas = () => {
        const improvements: any = [];
        Object.keys(formState).forEach(el => {
            let level = formState[el].split('_')?.[1]
            if (level && level == maturityLevel) {
                improvements.push({ question: el, current: formState[el].split("_")[0], next: questionsMap[el][questionsMap[el].findIndex((x: any) => x.option_text == formState[el].split("_")[0]) + 1].option_text })
            }
        })
        return <Table color={'blue'} key={'blue'} >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Area of Improvement</Table.HeaderCell>
                    <Table.HeaderCell>Current Level</Table.HeaderCell>
                    <Table.HeaderCell>Next Level</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {improvements.map((x: any) => <Table.Row key={x.question}>
                    <Table.Cell>{x.question}</Table.Cell>
                    <Table.Cell>{x.current}</Table.Cell>
                    <Table.Cell>{x.next}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
        </Table>
    }

    const DownloadableDoc = () => {
        return <Document>
            <Page>
                <View style={pdfStyles.container}>
                    <Text style={pdfStyles.heading}><Text style={pdfStyles.blueText}>VSK</Text> Maturity Tool Report</Text>
                    <View style={pdfStyles.info}>
                        <Text>Name: {formState.name}</Text>
                        <Text>Email: {formState.email}</Text>
                        <Text>Mobile: {formState.mobile}</Text>
                        <Text>Organization: {formState.organization}</Text>
                    </View>
                    <View style={pdfStyles.tableContainer}>
                        <View style={pdfStyles.tableHeader}>
                            <View style={pdfStyles.t1}><Text>Questions</Text></View>
                            <View style={pdfStyles.t2}><Text>Selected Option</Text></View>
                            <View style={pdfStyles.t3}><Text>Maturity Level</Text></View>
                        </View>
                        {Object.keys(formState)?.map(el => {
                            if (!['name', 'email', 'mobile', 'organization'].includes(el))
                                return <View style={pdfStyles.tableRow} key={el}>
                                    <View style={pdfStyles.t1}><Text>{el}</Text></View>
                                    <View style={pdfStyles.t2}><Text>{formState[el].split("_")[0]}</Text></View>
                                    <View style={pdfStyles.t3}><Text>{formState[el].split("_")[1]}</Text></View>
                                </View>
                        })}
                    </View>
                    <Text style={pdfStyles.maturityLevel}>Final Calculated Maturity: <Text style={pdfStyles.matText}>{maturityLevel}</Text></Text>
                </View>
            </Page>
        </Document>
    }

    return (
        <>
            {maturityLevel ?
                <CommonModal>
                    <div className={styles.matContainer}>
                        <div>
                            <Lottie options={defaultOptions}
                                height={isMobile ? 200 : 300}
                                width={isMobile ? 200 : 300}
                            />
                        </div>
                        <p>Your Maturity Level is </p>
                        <p className={styles[maturityLevel]}>{maturityLevel}</p>
                        <p>To get to the next level, improve on the following items: </p>
                        {findImprovementAreas()}
                        <div style={{ margin: '1rem 0rem 2rem 0rem', fontSize: '1.5rem' }}>
                            <PDFDownloadLink document={<DownloadableDoc />} fileName={`${formState.name}_${formState.organization}.pdf`}>
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download Report'
                                }
                            </PDFDownloadLink>
                        </div>
                        <Button primary size='large' onClick={() => resetState()}>Close</Button>
                    </div>
                </CommonModal>
                :
                <Form onSubmit={handleSubmit} size={'large'}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            id='form-input-control-name'
                            control={Input}
                            label='Name'
                            onChange={(e: any) => (setFormState((prevState: any) => ({ ...prevState, name: e.target.value })))}
                            placeholder='Name' error={!formErrors['name'] ? false : {
                                content: 'Please enter a valid name',
                            }}
                        />
                        <Form.Field
                            required
                            id='form-input-control-error-email'
                            control={Input}
                            label='Email'
                            onChange={(e: any) => {
                                setFormState((prevState: any) => ({ ...prevState, email: e.target.value }))
                                validateEmail(EmailValidator.validate(e.target.value));
                            }}
                            placeholder='janedoe@gmail.com'
                            error={(!formErrors['email'] && validEmail) ? false : {
                                content: 'Please enter a valid email',
                            }}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            required
                            id='form-input-control-mobile'
                            control={Input}
                            label='Mobile'
                            onChange={(e: any) => {
                                setFormState((prevState: any) => ({ ...prevState, mobile: e.target.value }))
                                validateMobile(e.target.value.length == 10)
                            }}
                            placeholder='Mobile'
                            type='number'
                            maxLength={10}
                            error={(!formErrors['mobile'] && validMobile) ? false : {
                                content: 'Please enter a valid mobile',
                            }}
                        />
                        <Form.Field
                            required
                            id='form-input-control-organization'
                            control={Input}
                            label='State/UT/Organization'
                            placeholder='State/UT/Organization'
                            onChange={(e: any) => (setFormState((prevState: any) => ({ ...prevState, organization: e.target.value })))}
                            error={!formErrors['organization'] ? false : {
                                content: 'Please enter a valid value',
                            }}
                        />
                    </Form.Group>
                    {questionData?.length > 0 &&
                        questionData?.map((el: any) =>
                            <>
                                <h3 >{el?.question_type}</h3>
                                {el?.vsk_questions?.map((q: any) => {
                                    tempState[q.question] = "";
                                    tempQuestionsMap[q.question] = q.vsk_question_options
                                    return <Form.Field
                                        required
                                        key={q.question_id}
                                        id={`form-input-control-${q?.question_id}`}
                                        control={Select}
                                        label={q.question}
                                        options={q?.vsk_question_options?.map((x: any) => ({ key: x.maturity_level, text: x.option_text, value: x.option_text + `_${x.maturity_level}` }))}
                                        //@ts-ignore
                                        onChange={(e: any, { value }) => (setFormState((prevState: any) => ({ ...prevState, [q.question]: value })))}
                                        placeholder={q.question}
                                        error={!formErrors[q.question] ? false : {
                                            content: 'Please select a value from the dropdown',
                                        }}
                                    />
                                }
                                )}
                            </>
                        )
                    }
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size={'large'}
                        color={'primary'}
                        content='Check Maturity'
                    />
                </Form>
            }
        </>
    )
}
