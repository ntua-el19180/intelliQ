import requests
import json
import pandas as pd
import argparse

parser = argparse.ArgumentParser()
parser.add_argument(
       "scope",
       type=str,
       choices=[
                "healthcheck",
                "resetall",
                "questionnaire_upd",
                "restq",
                "questionnaire",
                "question",
                "doanswer",
                "getsessionanswers",
                "getquestionanswers",
                "admin"
                ],
     help="choose scope",
                    )
    

          
parser.add_argument(
                                "--source", 
                                help="finding the survey",
                                type=str ,
                                nargs=1
                        )
    
parser.add_argument(
                                "--questionnaire_id", 
                                help="finding the survey",
                                type=str ,
                                nargs=1
                        )
    

parser.add_argument(
                                "--question_id",  
                                help="finding the question",
                                type=str ,
                                nargs=1
                        )
    
parser.add_argument(
                                "--session", 
                                help="?????",
                                type=str,
                                nargs=1
                        )
parser.add_argument(
                                "--option_id", 
                                help="?????",
                                type=str ,
                                nargs=1
                        )
parser.add_argument(
                                "--format", 
                                choices=["json","csv"],
                                help="choose data type",
                                type=str 
                                
                        )

args = parser.parse_args()  
if args.scope == "healthcheck":
   api = requests.get("http://localhost:9103/intelliq_api/healthcheck")
elif args.scope == "resetall":
    api = requests.post("http://localhost:9103/intelliq_api/resetall")
elif args.scope == "questionnaire_upd":
    api =requests.post("http://localhost:9103/intelliq_api/questionnaire_upd", json= "questionnaire1.json")
elif args.scope == "resetq":
    api ="http://localhost:9103/intelliq_api/resetq/{args.questionnaire_id}"
elif args.scope == "questionnaire":
    api =requests.get("http://localhost:9103/intelliq_api/questionnaire/{args.questionnaire_id}")
elif args.scope == "question":
    api ="http://localhost:9103/intelliq_api/question/{args.questionnaire_id}/{args.question_id}"
elif args.scope == "doanswer":
    api =requests.post("http://localhost:9103/intelliq_api/doanswer/{args.questionnaire_id}/{args.question_id}/{args.session}/{args.option_id}")
elif args.scope == "getsessionanswers":
    api =requests.get("http://localhost:9103/intelliq_api/getsessionanswers/{args.questionnaire_id}/{args.session}")
elif args.scope == "getquestionanswers":
    api =requests.get("http://localhost:9103/intelliq_api/getquestionanswers/{args.questionnaire_id}/{args.question_id}")
    




if args.format == "json":
    print( api.json())

