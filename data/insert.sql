INSERT INTO intelliq.`creator` (creatorID) VALUES ('0');

INSERT INTO intelliq.`questionnaire` (questionnaireID, questionnaireTitle, creatorID) VALUES ('0', 'My first research questrionnaire', '0');

/*INSERT INTO intelliq.`questions` (qID, questionnaireID, qtext, type, required) VALUES ('0', '0', 'What is your email?', 'profile', false);
INSERT INTO intelliq.`questions` (qID, questionnaireID, qtext, type, required) VALUES ('1', '0', 'What is your age?', 'profile', true);*/

INSERT INTO intelliq.`options` (optID, qID, questionnaireID,`nextqID`, opttxt) VALUES ('0', '0', '0', '1', '<open string>');
INSERT INTO intelliq.`options` (optID, qID, questionnaireID,`nextqID`, opttxt) VALUES ('1', '1', '0', '0', '<30');
INSERT INTO intelliq.`options` (optID, qID, questionnaireID,`nextqID`, opttxt) VALUES ('2', '1', '0', '0', '30-50');
INSERT INTO intelliq.`options` (optID, qID, questionnaireID,`nextqID`, opttxt) VALUES ('3', '1', '0', '0', '>50');



INSERT INTO intelliq.`participants` (participant_id, participant_name) VALUES ('0', 'Georgia');
INSERT INTO intelliq.`participants` (participant_id, participant_name) VALUES ('1', 'Christos');
INSERT INTO intelliq.`participants` (participant_id, participant_name) VALUES ('2', 'Vanti');

INSERT INTO intelliq.`questionnaireparticipant` (questionnaireParticipantID, questionnaireID, participant_id) VALUES ('0', '0', '0');
INSERT INTO intelliq.`questionnaireparticipant` (questionnaireParticipantID, questionnaireID, participant_id) VALUES ('1', '0', '1');
INSERT INTO intelliq.`questionnaireparticipant` (questionnaireParticipantID, questionnaireID, participant_id) VALUES ('2', '0', '2');