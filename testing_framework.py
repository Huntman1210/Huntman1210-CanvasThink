import random
import time

def simulate_user_interaction(quality_level):
    """
    Simulates a user interaction on an e-commerce platform.
    quality_level: 'low' or 'high'
    Returns: task_completion_time, errors_encountered, user_satisfaction_score
    """
    task_completion_time = 0
    errors_encountered = 0
    user_satisfaction_score = 0

    if quality_level == 'high':
        # High quality: faster, fewer errors, higher satisfaction
        task_completion_time = random.uniform(10, 30)  # seconds
        errors_encountered = random.randint(0, 1)
        user_satisfaction_score = random.uniform(4.0, 5.0)
    elif quality_level == 'low':
        # Low quality: slower, more errors, lower satisfaction
        task_completion_time = random.uniform(30, 90)  # seconds
        errors_encountered = random.randint(2, 5)
        user_satisfaction_score = random.uniform(1.0, 3.5)
    else:
        raise ValueError("Invalid quality_level. Must be 'low' or 'high'.")

    return task_completion_time, errors_encountered, user_satisfaction_score

def run_simulated_tests(num_users=100):
    """
    Runs simulated tests for both low and high quality scenarios.
    """
    print(f"Running {num_users} simulated tests for each quality level...")

    high_quality_results = []
    low_quality_results = []

    for _ in range(num_users):
        high_quality_results.append(simulate_user_interaction('high'))
        low_quality_results.append(simulate_user_interaction('low'))

    return high_quality_results, low_quality_results

if __name__ == '__main__':
    high_results, low_results = run_simulated_tests()

    # Save results to a file for analysis
    with open('high_quality_results.txt', 'w') as f:
        for result in high_results:
            f.write(f"{result[0]},{result[1]},{result[2]}\n")

    with open('low_quality_results.txt', 'w') as f:
        for result in low_results:
            f.write(f"{result[0]},{result[1]},{result[2]}\n")

    print("Simulated test data saved to high_quality_results.txt and low_quality_results.txt")
