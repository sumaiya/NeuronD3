import csv


def to_csv(file_name, n):
    to_write = [[]]
    for i in range(n):
        to_write.append({})
            
    with open(file_name, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=' ',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(to_write)
    
