"""
labels 파일에 사진 하나 당 단어 하나가 매칭되어 있지 않고 글자가 따로따로 떨어져 있을 때 합치기 위한 코드

예시: 
filename,words
image.jpg,단
image.jpg,어

=>

filename,words
image.jpg,단어

"""

import pandas as pd

df1 = pd.read_csv('en_train_filtered/labels_separate.csv', encoding='utf-8')
df2 = pd.read_csv('en_val/labels_separate.csv', encoding='utf-8')

df1.columns = df1.columns.map(lambda x: x.strip())
df2.columns = df2.columns.map(lambda x: x.strip())

df1_n = df1.groupby('filename')['words'].apply(lambda x: ''.join(x))
df2_n = df2.groupby('filename')['words'].apply(lambda x: ''.join(x))

df1_n.to_csv('en_train_filtered/labels.csv', encoding='utf-8')
df2_n.to_csv('en_val/labels.csv', encoding='utf-8')