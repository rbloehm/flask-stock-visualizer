import pandas as pd


def get_data():
    url = "http://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx?render=download"
    df = pd.read_csv(url, skipinitialspace=True, header=0,
                     names=["symbol", "name", "current_price", "net_change",
                            "percent_change", "volume", "value", "skip"])
    df.drop(columns="skip", inplace=True)
    df = df[df.value > 0.01]
    return {"children": df.to_dict("records")}
