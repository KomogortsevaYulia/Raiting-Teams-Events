import requests

URL="http://213.171.8.130:4001"
HEADERS = {
  "access-key":"6NEsV4WjlL4RrxGJZPNi",
  "script-key":""
}

SCRIPT_KEYS = ['rating-teams', 'student-rating']

print("script key list:")

def output_keys_choice(keys):
  for i in range(len(keys)):
    print(str(i+1) + ": " + keys[i])

output_keys_choice(SCRIPT_KEYS)

HEADERS["script-key"] = SCRIPT_KEYS[int(input("> choose the script-key: "))-1]

res=requests.get(URL, headers=HEADERS)
print(res.content)