def splitData(inputs):
    size_elements = len(inputs)
    first_size_percent = int(size_elements * 0.8)

    #first 80% from data as training data
    trainInputs = inputs[:first_size_percent]

    #second 20% from data as test data
    testInputs = inputs[first_size_percent:]

    return trainInputs, testInputs


def append_prediction_to_dataset(dataset, predicted):
    print(len(dataset))
    print(len(predicted))