import unittest
from temp.program import *

class TestProgram(unittest.TestCase):

    def test_fibonacci_zero(self):
        self.assertEqual(fib(0), 0)

    def test_fibonacci_one(self):
        self.assertEqual(fib(1), 1)

    def test_fibonacci_two(self):
        self.assertEqual(fib(2), 1)

    def test_fibonacci_three(self):
        self.assertEqual(fib(3), 2)

    def test_fibonacci_ten(self):
        self.assertEqual(fib(10), 55)

    def test_fibonacci_negative(self):
        self.assertEqual(fib(-1), 0)

    def test_fibonacci_large(self):
        self.assertEqual(fib(20), 6765)

if __name__ == '__main__':
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestProgram)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
