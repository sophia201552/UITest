class TestResult {
    constructor() {
        var _this = this;
        this.allData = undefined;
        this.rlt = undefined;
        this.status = {
            '0': '不通过',
            '1': '通过',
            'null': '--'
        }
        this.type = {
            '0': '检查点',
            '1': '步骤',
            '2': '断言',
            '3': '其它错误'
        }
    }

    show() {
        var defaultType = 'online'; // case_develop
        $.get('/run?type=case_' + defaultType, function (data) {
            //_this.renderList();
        });

        this.renderList();
    }
    attachEvent() {
        var _this = this;
        var $mainWrapper = $('.MainWrapper');
        $("#btnRun").off('click').on('click', function () {
            var $iptRunNum = $('.iptRunNum').val();
            $.get('/run', function (data) {
                _this.renderList();
            })
        })

        $("#refreshList").off('click').on('click', function () {
            _this.renderList();
        });

        $("#removeAllList").off('click').on('click', function () { // 删除所有
            _this.removeCase();
        });

        $('.btnRemove').off('click').on('click', function (e) { // 删除一个 暂未实现
            _this.removeCase($(this));
        });

        $('.btnLook').off('click').on('click', function (e) {
            var checkId = $(e.currentTarget).attr('data-id');
            var caseMap = _this.findCaseId(checkId);
            _this.renderCaseList(caseMap);
        });
        $('.btnBack').off('click').on('click', function () {
            $mainWrapper.hide();
        });
        $('.btnLookDetail').off('click').on('click', function (e) {
            $('.detailContainer').show();
            var noticeId = $(e.currentTarget).attr('data-id');
            var caseList = _this.rlt.case,
                caseMap;
            for (var i = 0; i < caseList.length; i++) {
                if (caseList[i].noticeId == noticeId) {
                    caseMap = caseList[i];
                }
            }
            _this.renderModalDetail(caseMap);
        });
        $('.btnBackList').off('click').on('click', function () {
            $('.detailContainer').hide();
        });
    }
    findCaseId(checkId) {
        var _this = this;
        var allData = this.allData;
        for (var i = 0; i < allData.length; i++) {
            if (allData[i]._id == checkId) {
                return allData[i];
            }
        }
    }
    renderList() {
        var _this = this, $tableLoad = $("#tableLoad");
        $tableLoad.show();
        $.post('/testLogList', {
            'executor': 'owen'
        }, function (result) {
            console.log(result[0]);
            // if (!result.length) {
            //     alert('暂无测试记录!');
            //     return;
            // }

            var $listTable = $('.resultTable').find('tbody');
            $listTable.empty();
            //_this.allData = result.reverse();
            _this.allData = result;
            var tableHtml = '';
            for (var i = 0; i < _this.allData.length; i++) {
                tableHtml += '<tr>';
                var listRow = result[i],
                    caseEle = listRow.case,
                    caseNum = caseEle.length,
                    $listTd = '',
                    passNum = 0,
                    failedNum = 0;
                for (var j = 0; j < caseEle.length; j++) {
                    var step = caseEle[j].step;
                    caseEle[j].status == 1 && passNum++;
                }
                tableHtml += '<td>' + listRow.startTime + '</td><td>' + listRow.endTime + '</td><td>'
                    + listRow.executor + '</td><td>' + caseNum + '</td><td>'
                    + passNum + '</td><td><button class="btnLook mr10" type="button" data-id="'
                    + listRow._id + '">查看</button><button class="btnRemove" type="button" data-id="'
                    + listRow._id + '">删除</button></td>';
                tableHtml += '</tr>';
            }
            $listTable.html(tableHtml);
            $tableLoad.hide();
            _this.attachEvent();
        })
    }
    removeCase($this) {
        let url = '/removeCase';
        if ($this) {
            url = '/removeCase?_id=' + $this.attr('data-id');
        }
        $.get(url, function (res) {
            if (res && res.ok) {
                if ($this) { // 删除一个
                    $this.closest('tr').remove();
                } else { // 删除全部
                    alert('删除成功');
                    $("#resultContent .resultTable tbody").empty();
                }
            } else {
                alert('删除失败');
            }
        });
    }
    renderCaseList(caseMap) {
        var _this = this;
        var $mainWrapper = $('.MainWrapper');
        $mainWrapper.show();
        var $caseTable = $('.caseTable').find('tbody');
        $caseTable.empty();
        caseMap.case = caseMap.case.map(function (ele, index) {
            ele.noticeId = 'case_' + index;
            return ele;
        })
        var trHtml = '';
        caseMap.case.forEach(function (element) {
            trHtml += '<tr><td>' + element.name + '</td>' +
                '<td>' + element.startTime + '</td>' +
                '<td>' + element.endTime + '</td>' +
                '<td>' + _this.status[element.status] + '</td>' +
                '<td><button class="btnLookDetail" type="button" data-id="' + element.noticeId + '">查看</button></td>' +
                '</tr>';
        });
        $caseTable.html(trHtml);
        _this.rlt = caseMap;
        _this.attachEvent();
    }
    renderModalDetail(caseMap) {
        var _this = this;
        var $detailTable = $('.detailTable').find('tbody').empty();
        var rowStep = '';
        var caseStep = caseMap.step;
        var tableHtml = '<tr>';
        var statusClass = caseMap.status ? 'casePass' : 'caseNotPass';
        var statusText = caseMap.status ? '通过' : '未通过';
        tableHtml += '<td><div class="stepLog"><span>状态</span></div></td><td><div><span class="' + statusClass + '">' + statusText + '</span></div></td>';
        tableHtml += '<tr><td>开始时间</td><td>' + caseMap.startTime + '</td></tr><tr><td>结束时间</td><td>' + caseMap.endTime + '</td></tr><tr><td>' + caseMap.name + '</td><td><div class="stepBox">';
        caseStep.forEach(function (ele) {
            tableHtml += '<div class="stepLog"><span>' + _this.type[ele.type] + '</span><span>' + ele.name + '</span></div>';
            if (ele.type == 2 || ele.type == 3) {
                tableHtml += '<div class="screenCatch"><img src="data:image/jpg;base64,' + ele.screenCatch + '" alt=""></div>';
            }
        });
        tableHtml += '</div></td></tr>';
        $detailTable.html(tableHtml);
        _this.attachEvent();
    }
    close() {

    }
}