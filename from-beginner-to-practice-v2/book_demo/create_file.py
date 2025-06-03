import os
import random


def create_sample_directory_structure(root_path):
    """
    创建一个示例的四层文件夹结构

    参数:
    root_path: 根目录的路径
    """
    # 创建基本的文件夹结构
    structure = {
        '第一层A': {
            '第二层A': {
                '第三层A': ['文件1.txt', '文件2.txt'],
                '第三层B': ['文件5.txt', '文件6.txt']
            },
            '第二层B': {
                '第三层C': ['文件7.txt', '文件8.txt']
            }
        },
        '第一层B': {
            '第二层C': {
                '第三层D': ['文件9.txt', '文件10.txt']
            }
        }
    }

    def create_structure(current_path, structure_dict):
        """递归创建文件夹结构和文件"""
        for name, content in structure_dict.items():
            path = os.path.join(current_path, name)

            # 创建文件夹
            os.makedirs(path, exist_ok=True)
            print(f"创建文件夹: {path}")

            if isinstance(content, dict):
                # 如果是字典，继续递归创建子文件夹
                create_structure(path, content)
            elif isinstance(content, list):
                # 如果是列表，创建文件
                for filename in content:
                    file_path = os.path.join(path, filename)
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(f"这是示例文件 {filename} 的内容\n")
                        f.write(f"创建时间: {random.randint(1, 100)}\n")
                    print(f"创建文件: {file_path}")

    # 创建根目录
    os.makedirs(root_path, exist_ok=True)
    print(f"\n开始创建目录结构在: {root_path}\n")

    # 创建整个结构
    create_structure(root_path, structure)

    print("\n目录结构创建完成！")


def main():
    # 获取用户输入的根目录路径
    root_path = input("请输入要创建示例目录结构的路径: ").strip()

    # 确认操作
    print(f"\n即将在 {root_path} 创建示例的四层目录结构")
    confirm = input("是否继续？(y/n): ").strip().lower()

    if confirm == 'y':
        create_sample_directory_structure(root_path)
    else:
        print("\n操作已取消。")


if __name__ == "__main__":
    main()
