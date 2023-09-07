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