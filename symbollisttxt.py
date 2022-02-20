import json

# with를 이용해 파일을 연다.
# json 파일은 같은 폴더에 있다고 가정!
idx = 0
symbol = []
with open('symbol.json') as json_file:
    json_data = json.load(json_file)

    for item in json_data: 
    # 문자열
    # key가 json_string인 문자열 가져오기
        json_string = item["title"]
        print(json_string)
        idx+=1
        symbol.append(json_string)

print(idx)
print(symbol)