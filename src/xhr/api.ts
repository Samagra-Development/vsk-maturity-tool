/*
*   XHR calls to fetch and set data to Hasura DB.
*/

import { clientGQL } from "./clientGQL";


export const getQuestions = async () => {
  try {
    const res = await clientGQL(`query MyQuery {
            vsk_sets {
              question_type
              vsk_questions {
                question
                question_id
                vsk_question_options {
                  option_text
                  maturity_level
                }
              }
            }
          }
          `, {});
    let resJson = await res.json();
    return resJson.data;

  } catch (err) {
    console.log(err)
    return null;
  }
}

export const saveToHasura = async (data: any, finalMaturity: any) => {
  let newData = { ...data };
  delete newData.name;
  delete newData.mobile;
  delete newData.email;
  delete newData.organization;
  for (let el in newData) {
    newData[el] = newData[el].split("_")[0];
  }
  try {
    const res = await clientGQL(`
    mutation ($object: [vsk_submissions_insert_input!] = {}) {
      insert_vsk_submissions(objects: $object) {
        returning {
          id
          created_at
        }
      }
    }
    `, {
      object: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        organization: data.organization,
        calculated_maturity: finalMaturity,
        maturity_data: JSON.stringify(newData)
      }
    });
    let resJson = await res.json();
    return resJson.data;

  } catch (err) {
    console.log(err)
    return null;
  }
}