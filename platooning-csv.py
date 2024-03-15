import csv
import matplotlib.pyplot as plt
from collections import defaultdict
import os

def parse_csv(filename):
    car_data = defaultdict(lambda: {'time': [], 'distance': [], 'velocity': []})
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            car_index = int(row[0])
            car_data[car_index]['time'].append(float(row[1]))
            car_data[car_index]['distance'].append(float(row[2]))
            car_data[car_index]['velocity'].append(float(row[3]))
    return car_data

def plot_and_save(output_filename, data, ylabel):
    plt.figure(figsize=(10, 5))
    for car_index, car_data in data.items():
        if ylabel == 'distance' and car_index == len(data.items()) - 1:
            continue
        plt.plot(car_data['time'], car_data[ylabel], marker='o', linestyle='-', label=f'Auto {car_index + 1}' if ylabel == 'velocity' else f'Distanza {car_index + 1}-{car_index + 2}')
    plt.xlabel('Tempo (s)')
    plt.ylabel('Velocità (m/s)' if ylabel == 'velocity' else 'Distanza (m)')
    plt.legend()
    plt.tight_layout()
    plt.savefig(output_filename)
    plt.close()

def plot_and_save_combined(car_data, index):
    output_directory = 'output_plots'
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    plot_and_save(f'{output_directory}/distance_{index}.png', car_data, 'distance')
    plot_and_save(f'{output_directory}/velocity_{index}.png', car_data, 'velocity')

if __name__ == "__main__":
    # Get all the filenames in the current directory of csv files
    path = os.getcwd()
    files = os.listdir(path)
    # Filter the files to get only the csv files
    csv_files = [f for f in files if f.endswith('.csv')]
    # Iterate through the csv files and plot the graphs
    for file in csv_files:
        index = csv_files.index(file)
        car_data = parse_csv(file)
        plot_and_save_combined(car_data, index)
