import os
import shutil
from pathlib import Path


def move_files_from_fifth_level(first_level_path):
    """
    将第五层文件夹中的所有文件移动到第二层文件夹下

    参数:
    first_level_path: 第一层文件夹的路径
    """
    # 确保输入的路径存在
    if not os.path.exists(first_level_path):
        print(f"错误：路径 {first_level_path} 不存在")
        return

    # 确保输入的是第一层文件夹
    # if not os.path.basename(first_level_path).startswith('第一层'):
    #     print(f"错误：请输入第一层文件夹的路径（文件夹名应以'第一层'开头）")
    #     return

    # 记录移动的文件数量
    moved_count = 0
    found_fifth_level = False

    # 遍历所有文件和文件夹
    for dirpath, dirnames, filenames in os.walk(first_level_path):
        # 计算当前目录相对于第一层的深度
        depth = dirpath[len(first_level_path):].count(os.sep)

        # 如果是第五层目录（相对深度为 4）
        if depth == 4:
            found_fifth_level = True
            # 获取第二层目录的路径（向上三级）
            second_level_path = os.path.dirname(os.path.dirname(os.path.dirname(dirpath)))

            # 只有当有文件时才处理
            if filenames:
                print(f"\n处理第五层文件夹: {dirpath}")

                # 移动该目录下的所有文件到第二层
                for filename in filenames:
                    source_file = os.path.join(dirpath, filename)
                    destination_file = os.path.join(second_level_path, filename)

                    try:
                        # 如果目标位置已存在同名文件，添加数字后缀
                        if os.path.exists(destination_file):
                            base, extension = os.path.splitext(filename)
                            counter = 1
                            while os.path.exists(destination_file):
                                new_filename = f"{base}_{counter}{extension}"
                                destination_file = os.path.join(second_level_path, new_filename)
                                counter += 1

                        # 移动文件
                        shutil.move(source_file, destination_file)
                        moved_count += 1
                        print(f"已移动: {source_file} -> {destination_file}")
                    except Exception as e:
                        print(f"移动文件 {filename} 时出错: {str(e)}")

    if not found_fifth_level:
        print("\n未找到任何第五层文件夹，不执行任何操作。")
        return 0

    return moved_count


def main():
    # 获取用户输入的第一层文件夹路径
    first_level_path = input("请输入要处理的第一层文件夹路径（如：/path/to/第一层A）: ").strip()

    # 确认操作
    print(f"\n即将检查 {first_level_path} 中的第五层文件夹，并将其中的文件移动到对应的第二层目录。")
    confirm = input("是否继续？(y/n): ").strip().lower()

    if confirm == 'y':
        moved_count = move_files_from_fifth_level(first_level_path)
        if moved_count > 0:
            print(f"\n操作完成！共移动 {moved_count} 个文件。")
    else:
        print("\n操作已取消。")


if __name__ == "__main__":
    main()
